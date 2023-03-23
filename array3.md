/*
  *  Dynamic array of movable structs
  *  Movable structs are structs where shallow is not enoght
  *  so we consider the inner data of the struct is moved
 */

#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>

#ifdef _MSC_VER
#define strdup _strdup
#endif

struct book {
    char* title;
};

void book_destroy(struct book* book)
{
    /*destroy must be able to ignore all zeroes book*/
    free(book->title);
}


struct books {
    struct book* data;
        int size;
        int capacity;
};

int books_reserve(struct books* p, int n)
{
        if (n > p->capacity) {

            const size_t new_size_bytes = (size_t)n * sizeof(p->data[0]);
            void* pnew = realloc(p->data, new_size_bytes);
            if (pnew == NULL) return ENOMEM;

            p->data = pnew;
            p->capacity = n;
        }

        return 0;
}



[[nodiscard]]
int books_push_back(struct books* p, struct book* book)
{
        if (p->size == INT_MAX) {
            return EOVERFLOW;
        }

        if (p->size + 1 > p->capacity) {

            unsigned long long new_capacity = p->capacity + p->capacity / 2;


            if (new_capacity < p->size + 1) {
                new_capacity = p->size + 1;
            }
            else if (new_capacity > INT_MAX) {
               new_capacity = INT_MAX;
            }

       int error = books_reserve(p, (int)new_capacity);
            if (error != 0) {
                return error;
            }
        }

        p->data[p->size] = *book; /*MOVED*/

       /*
         after move (on success) the object book cannot be used 
         anymore. But we can still call destroy on it (with no effect)
         just for state simplification.
       */
        memset(book, 0, sizeof(*book));

        p->size++;

        return 0;
}

void books_destroy(struct books* books)
{
    for (int i = 0; i < books->size; i++) {
        book_destroy(&books->data[i]);
    }

    free(books->data);
}

#define try  if (1)
#define throw goto CATCH
#define catch else CATCH:

int main()
{
   struct books books = { 0 };


    struct book book = { 0 };
    try
    {
      book.title = strdup("title 1");
      if (book.title == NULL) throw;
      if (books_push_back(&books, &book) == 0)
      {
         /*MOVED ON SUCCESS*/
      }
    }
    catch
    {
    }

    book_destroy(&book);
    books_destroy(&books);
}
